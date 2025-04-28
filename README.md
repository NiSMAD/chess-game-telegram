# ♟️ Chess Game Telegram Bot

![Python](https://img.shields.io/badge/Python-3.8+-blue)
![Telegram](https://img.shields.io/badge/Telegram_Bot_API-6.x-green)
![Chess](https://img.shields.io/badge/Chess-Game-yellow)

A Telegram bot that allows users to play chess against each other or against the computer directly in Telegram chats.

##  Features

- **Multiplayer Chess**  
  Play against other Telegram users in private or group chats
- **Computer Opponent**  
  Challenge an AI opponent with adjustable difficulty
- **Move Validation**  
  Enforces all standard chess rules
- **Visual Board**  
  Renders chess positions using Unicode characters
- **Game History**  
  Saves and resumes ongoing games

## 🛠️ Tech Stack

- **Language**: [Python 3.8+](https://www.python.org/)
- **Telegram API**: [python-telegram-bot](https://python-telegram-bot.org/)
- **Chess Engine**: [python-chess](https://python-chess.readthedocs.io/)

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone https://github.com/NiSMAD/chess-game-telegram.git

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure bot
cp config.example.py config.py
# Edit config.py with your Telegram bot token

# 4. Run the bot
python main.py
