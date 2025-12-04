import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SignUpForm from './SignUpForm';
import { signUpAction } from '@/lib/actions/auth';

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* 表单组件位置 */}
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
