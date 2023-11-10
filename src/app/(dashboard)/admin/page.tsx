import { authOptions, getAuthSession } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getAuthSession();
<<<<<<< HEAD
=======
  console.log(session?.user.id);
>>>>>>> 33bb074b1e2b508ad0967b9b8c8a8dabda7c2d01

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
