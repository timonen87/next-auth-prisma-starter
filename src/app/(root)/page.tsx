// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";

// const page = async () => {
//   const session = await getServerSession(authOptions);

//   if (session?.user) {
//     return (
//       <p>
//         Добро пожаловать в Админ панель,{" "}
//         {session?.user.username || session.user.name}
//       </p>
//     );
//   }

//   return (
//     <div>
//       <h1>Войдите в систему</h1>
//     </div>
//   );
// };

// export default page;

"use client";
import { Modal } from "@/components/ui/modal";

import { useEffect } from "react";
import { useStoreModal } from "../../../hooks/use-store-modal";

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return <div>Root Page</div>;
};

export default SetupPage;
