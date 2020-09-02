import { profileTypes } from '../types/profile.types';
import { profileServices } from '../services/profile.service';

export const getCurrentProfile = () => (dispatch) => {
  profileServices.getCurrentProfile().then(
    (profile) => {
      dispatch({ type: profileTypes.GET_PROFILE, payload: profile });
    },
    (error) => {
      dispatch({ type: profileTypes.CLEAR_PROFILE });
      dispatch({ type: profileTypes.PROFILE_ERROR, payload: { msg: error } });
    }
  );
};
