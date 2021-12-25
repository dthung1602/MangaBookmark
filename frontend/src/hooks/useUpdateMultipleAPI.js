import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { notification } from "antd";

import { MangaAPI } from "../api";
import { throwOnCriticalErrors, notifyError } from "../utils/error-handler";
import { GlobalContext } from "../components/GlobalContext";

const UpdateResult = ({ success, fail }) => {
  const mangasWithNewChaps = success.filter((mg) => mg.newChapCount > 0);
  return (
    <>
      <div>
        {success.length} manga(s) updated <i>successfully</i>.
      </div>
      <div>{mangasWithNewChaps.length} of which has/have new chapters</div>
      {mangasWithNewChaps.length === 0 ? null : (
        <ul>
          {mangasWithNewChaps.map((mg) => (
            <li key={mg._id}>
              <a href={mg.link} rel="noopener noreferrer" target="_blank">
                {mg.name}
              </a>
              &nbsp;&nbsp; ({mg.newChapCount})
            </li>
          ))}
        </ul>
      )}
      <div>
        {fail.length} manga(s) <i>failed</i> to update
      </div>
      {fail.length === 0 ? null : (
        <ul>
          {fail.map((mg) => (
            <li key={mg._id}>
              <a href={mg.link} rel="noopener noreferrer" target="_blank">
                {mg.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

UpdateResult.propTypes = {
  success: PropTypes.array.isRequired,
  fail: PropTypes.array.isRequired,
};

const useUpdateMultipleAPI = (filters) => {
  const [{ isUpdatingMangas }, updateGlobalState] = useContext(GlobalContext);

  const updateMangas = () => {
    updateGlobalState({ isUpdatingMangas: true });
    MangaAPI.updateMultiple(filters)
      .result.then(throwOnCriticalErrors)
      .then(async () => {
        const response = await MangaAPI.pollUpdateResult().result;
        const { result } = await response.json();
        const success = result.filter((m) => m.status === "success");
        const fail = result.filter((m) => m.status === "failed");
        notification.open({
          message: <b>Update {result.length} mangas in total</b>,
          description: <UpdateResult total={result.length} success={success} fail={fail} />,
        });
      })
      .catch(notifyError)
      .finally(() => updateGlobalState({ isUpdatingMangas: false }));
  };

  return [isUpdatingMangas, updateMangas];
};

export default useUpdateMultipleAPI;
