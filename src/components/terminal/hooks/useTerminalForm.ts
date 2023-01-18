import { useForm } from "react-hook-form";

interface TerminalForm {
  hiddenInput: string;
}

export const useTerminalForm = () => {
  const methods = useForm<TerminalForm>({
    defaultValues: { hiddenInput: "" },
  });
  return { methods };
};
