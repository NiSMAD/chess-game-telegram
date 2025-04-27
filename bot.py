import logging
from aiogram import Bot, Dispatcher, executor, types
from config import BOT_TOKEN, GAME_SHORT_NAME

logging.basicConfig(level=logging.INFO)

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=["start"])
async def start_handler(message: types.Message):
    keyboard = types.InlineKeyboardMarkup()
    play_button = types.InlineKeyboardButton(text="Играть в шахматы", callback_game=types.CallbackGame())
    keyboard.add(play_button)
    await message.answer("Привет! Готов сыграть в шахматы?", reply_markup=keyboard)

@dp.callback_query_handler(lambda c: True)
async def callback_handler(callback_query: types.CallbackQuery):
    await bot.answer_callback_query(callback_query.id, url=f"https://your-server.com/index.html")  # Пока ставим заглушку!

if __name__ == "__main__":
    executor.start_polling(dp, skip_updates=True)
