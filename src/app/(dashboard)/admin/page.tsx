import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return <p>Добро пожаловать в Админ панель, {session?.user.username}</p>;
  }

  return (
    <div>
      <h1>Войдите в систему</h1>
    </div>
  );
};

export default page;
