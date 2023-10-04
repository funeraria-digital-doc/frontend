import { useUser } from '@/composables/user';

export async function checkAuth(minRole: number, requiresAuth: boolean) {
  const { authenticateUserFromToken, user } = useUser();
  if (!requiresAuth) {
    return true;
  }
  let hasRole = false;
  if (user.name === '') {
    await authenticateUserFromToken().then(() => {
      hasRole = checkRole(minRole);
    });
  } else {
    hasRole = checkRole(minRole);
  }

  return hasRole;
}

function checkRole(minRole: number) {
  const { isUserAuthenticated, user } = useUser();
  return isUserAuthenticated() && user.role >= minRole ? true : false;
}
