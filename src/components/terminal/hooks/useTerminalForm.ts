import { useForm } from "react-hook-form";

export interface TerminalForm {
  hiddenInput: string;
}

export const useTerminalForm = () => {
  const methods = useForm<TerminalForm>({
    defaultValues: { hiddenInput: "" },
    mode: "onSubmit",
  });
  return { methods };
};
