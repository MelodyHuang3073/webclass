'use client';
import { AppBar, Button, Toolbar } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

export default function Menu() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" variant={pathname === "/account" ? "outlined" : "text"} onClick={() => router.push("/account")}>主頁面</Button>
        <Button color="inherit" variant={pathname === "/product" ? "outlined" : "text"} onClick={() => router.push("/product")}>QA管理</Button>
      </Toolbar>
    </AppBar>
  );
}