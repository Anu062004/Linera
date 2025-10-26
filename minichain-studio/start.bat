@echo off
REM MiniChain Studio Startup Script for Windows
echo 🚀 Starting MiniChain Studio...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd ..\backend
call npm install

REM Build smart contracts (if Rust is available)
where cargo >nul 2>&1
if %errorlevel% equ 0 (
    echo 🦀 Building smart contracts...
    cd ..\contracts\counter_app
    cargo build --target wasm32-unknown-unknown --release >nul 2>&1 || echo ⚠️  Counter app build failed (Rust target not configured)
    
    cd ..\poll_app
    cargo build --target wasm32-unknown-unknown --release >nul 2>&1 || echo ⚠️  Poll app build failed (Rust target not configured)
    
    cd ..\tip_jar_app
    cargo build --target wasm32-unknown-unknown --release >nul 2>&1 || echo ⚠️  Tip Jar app build failed (Rust target not configured)
) else (
    echo ⚠️  Rust not found. Smart contracts will use demo mode.
)

REM Start backend
echo 🔧 Starting backend server...
cd ..\..\backend
start "Backend Server" cmd /k "npm run dev"

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo 🎨 Starting frontend server...
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ✅ MiniChain Studio is running!
echo 📊 Backend: http://localhost:3001
echo 🎨 Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause >nul
