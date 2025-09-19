import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@renderer/components/ui/card";
import LoginForm from "@renderer/components/Auth/LoginForm";

const LoginScreen = () => {
  return (
    <Card className="mx-auto my-5 w-[500px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default LoginScreen;
