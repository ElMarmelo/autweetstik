import { useState } from "react";
import { Button } from "~/components/ui/button";
import { ImHome } from 'react-icons/im'



export default function Home() {

  const [loading, setLoading] = useState(false)
  return (
    <>
      <h1>Henlo</h1>
      <Button variant={"primary"} loading={loading} onClick={() => setLoading(!loading)} icon={<ImHome />}>Botón con ícono</Button>
      <Button variant={"secondary"} size={"lg"} loading={loading} onClick={() => setLoading(!loading)} icon={<ImHome />}>Secundario</Button>
      <Button variant={"ghostPrimary"} size={"sm"} loading={loading} onClick={() => setLoading(!loading)} icon={<ImHome />}>Fantasma</Button>
      <Button variant={"ghostSecondary"} size={"sm"} loading={loading} onClick={() => setLoading(!loading)} icon={<ImHome />}>Fantasma secundario</Button>
    </>
  );
}
