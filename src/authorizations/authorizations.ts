import { useUser } from '@/composables/user';
import { AUTH_PERMISSIONS } from './constants';

const route_auth = {
  home: AUTH_PERMISSIONS.NO_AUTH,
  profile: AUTH_PERMISSIONS.USER,
  users: AUTH_PERMISSIONS.STAFF,
  groups: AUTH_PERMISSIONS.SUPER,
  templates: AUTH_PERMISSIONS.SUPER,
  templates_create: AUTH_PERMISSIONS.SUPER,
  templates_edit: AUTH_PERMISSIONS.SUPER,
  records: AUTH_PERMISSIONS.USER,
  records_create: AUTH_PERMISSIONS.USER,
  records_edit: AUTH_PERMISSIONS.USER,
  stats: AUTH_PERMISSIONS.STAFF,
  about: AUTH_PERMISSIONS.NO_AUTH,
  not_found: AUTH_PERMISSIONS.NO_AUTH,
  service_unavailable: AUTH_PERMISSIONS.NO_AUTH,
  others: AUTH_PERMISSIONS.NO_AUTH,
};

export function getAuth(route_name: string) {
  if (Object.keys(route_auth).includes(route_name)) {
    return route_auth[route_name];
  } else {
    return ['super'];
  }
}

export async function checkAuth(roles: any) {
  const { authenticateUserFromToken, isUserAuthenticated } = useUser();
  if (roles.length == 0) {
    return true;
  }
  let hasRole = false;
  if (isUserAuthenticated()) {
    hasRole = checkRole(roles);
  } else {
    await authenticateUserFromToken().then(() => {
      hasRole = checkRole(roles);
    });
  }

  return hasRole;
}

function checkRole(roles: any) {
  const { user } = useUser();
  return roles.includes(user.role);
}
