import logging
import os
import json
import chess 
from config import BOT_TOKEN 
from telegram import Update
from telegram.ext import (CommandHandler, 
                          Application)
from telegram.ext import filters  


logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

logger = logging.getLogger(__name__)
GAME_DATA_FILE = 'data/game_state.json'
TOKEN = BOT_TOKEN 

def load_game():
    if os.path.exists(GAME_DATA_FILE):
        with open(GAME_DATA_FILE, 'r') as f:
            return json.load(f)
    return {"board": "start", "turn": "white"}

def save_game(game_state):
    with open(GAME_DATA_FILE, 'w') as f:
        json.dump(game_state, f)

async def start(update: Update, context):
    game_state = load_game()
    
    if game_state["board"] == "start":
        game_state["board"] = chess.Board().fen()  
        game_state["turn"] = "white"

    save_game(game_state)
    
    await update.message.reply_text('Добро пожаловать в шахматы! Начни игру с /new_game')

async def new_game(update: Update, context):
    game_state = {"board": chess.Board().fen(), "turn": "white"}
    save_game(game_state)

    await update.message.reply_text('Новая игра начата! Белые начинают.')

async def make_move(update: Update, context):
    user_move = ' '.join(context.args) 
    game_state = load_game()

    board = chess.Board(game_state["board"])
    if board.is_valid_move(user_move): 
        board.push(chess.Move.from_uci(user_move))
        game_state["board"] = board.fen() 
        game_state["turn"] = "black" if game_state["turn"] == "white" else "white"
        save_game(game_state)
        
        await update.message.reply_text(f"Ваш ход: {user_move}. Ход {game_state['turn']}.")
    else:
        await update.message.reply_text(f"Некорректный ход: {user_move}. Попробуйте снова.")

def main():
    application = Application.builder().token(TOKEN).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("new_game", new_game))
    application.add_handler(CommandHandler("move", make_move, filters=filters.Text))

    application.run_polling()

if __name__ == '__main__':
    main()
