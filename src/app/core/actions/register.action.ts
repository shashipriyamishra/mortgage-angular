import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Register Page] Register',
  props<{ username: string; password: string }>()
);