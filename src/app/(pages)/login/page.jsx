import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login to Your Account | Reserviq",
  description: "Access your Reserviq account to manage your bookings and profile.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-12 px-4">
      <LoginForm />
    </div>
  );
}
