import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "16px" }}>{children}</main>
    </div>
  );
}
