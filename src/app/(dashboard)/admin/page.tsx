import { authOptions, getAuthSession } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getAuthSession();

  if (session?.user) {
    return (
      <p>
        Добро пожаловать в Админ панель,{" "}
        {session?.user.username || session.user.name}
      </p>
    );
  }

  return (
    <div>
      <h1>Войдите в систему</h1>
    </div>
  );
};

export default page;
