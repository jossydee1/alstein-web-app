export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="font-visbymedium antialiased">{children}</div>;
}
