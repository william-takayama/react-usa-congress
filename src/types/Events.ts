export interface Events {
  "form-finalize": {
    id: string;
    type: "request" | "response" | "error";
    data: any;
    fields?: string[];
  };
  "search-change": {
    id: string | number;
    value: string;
    // values: FormValues;
  };
}
