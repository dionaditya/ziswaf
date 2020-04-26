import {roleAbilityAdmin, roleAbilityOperator} from '@/data/misc/RoleAbility';
import { getUserInfo } from '@/app/infrastructures/misc/Cookies';
const userInfo = getUserInfo();

const handleUnAuthorizedRole = (name) => {
  const userRole = userInfo?.role;
  const abilityRole = userRole === 1 ? roleAbilityAdmin : roleAbilityOperator;
  const isAccess = abilityRole.find(role => role.name === name);
  if(!isAccess) {
    return true
  }
  return false
}

export default handleUnAuthorizedRole;