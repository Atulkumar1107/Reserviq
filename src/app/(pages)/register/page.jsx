import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Create an Account | Join Reserviq",
  description: "Sign up for Reserviq to start booking premium rooms and managing your reservations.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-12 px-4">
      <RegisterForm />
    </div>
  );
}
