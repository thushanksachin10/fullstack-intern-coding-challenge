import { Button, TextField, Container } from "@mui/material";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await api.post("/auth/login", { email, password });
    login(res.data.token, res.data.role);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField name="email" label="Email" fullWidth margin="normal" />
        <TextField
          name="password"
          type="password"
          label="Password"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
}
