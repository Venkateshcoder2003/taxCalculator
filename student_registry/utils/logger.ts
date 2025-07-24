// Logger class for standard logging throughout the application.
export class Logger {
  static info(message: string) {
    console.log(`[studentRegistry]${message}`);
  }
  static error(message: string) {
    console.log(`[studentRegistry]${message}`);
  }
}
