import './globals.css';

export default function Layout({ children, modal }: {
    children: React.ReactNode,
    modal: React.ReactNode,
  }) {
    return (
        <html lang="en">
            <body>
                {children}
                {modal}
                <div id="modal-root" />
            </body>
        </html>
    );
}
