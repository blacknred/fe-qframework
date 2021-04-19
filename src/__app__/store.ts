import { Store } from "../lib";

export interface IAppStore {
  todos: { id: number; text: string; done: boolean }[];
  useForm: boolean;
}

const store = new Store<IAppStore>(
  {
    useForm: true,
    todos: []
  },
  {
    // debug: true,
    persister: true
  }
);

export default store;
