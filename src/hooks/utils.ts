type CurrentUser = {
  rol: string;
};

export function rollenCheck(rol: string, currentUser: CurrentUser) {
  return currentUser.rol === rol;
}
