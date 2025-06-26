import "./globals.css";
import { BookmarkProvider } from "@/app/context/BookmarkContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BookmarkProvider>{children}</BookmarkProvider>
      </body>
    </html>
  );
}
