type Props = {
  params: {
    lang: string;
  };
  children: React.ReactNode;
};

export default function Layout({ children, params }: Props) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
