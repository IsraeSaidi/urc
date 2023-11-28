import { Button, TextField } from "@mui/material";

const Messages = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    console.log("heey");
  };

  return (
    <form onSubmit={handleSubmit} >
      <TextField
        id="message"
        label="Message"
        name="message"
        variant="standard"
        margin="normal"
        required
        fullWidth
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Envoyer
      </Button>
    </form>
  );
};

export default Messages;

  