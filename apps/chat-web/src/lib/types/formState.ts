export type SignFormState =
  | {
      data: {
        name?: string;
        email?: string;
        password?: string;
      };
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string | InfoState;
    }
  | undefined;

export enum InfoState {
  VALID = "valid",
  SUCCESS = "success",
  FAILED = "failed",
}
