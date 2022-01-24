import { useContext } from "react";
import PropTypes from "prop-types";
import { Button, notification } from "antd";

import { MangaAPI } from "../api";
import { throwOnCriticalErrors, notifyError } from "../utils/error-handler";
import { GlobalContext } from "../components/GlobalContext";
import { ReloadOutlined } from "@ant-design/icons";

const reload = () => {
  window.location.reload();
};

const UpdateResult = ({ success, fail }) => {
  const mangasWithNewChaps = success.filter((mg) => mg.data.newChapCount > 0);

  return (
    <>
      <div>
        {success.length} manga(s) updated <i>successfully</i>
      </div>
      <div>{mangasWithNewChaps.length} of which has/have new chapters</div>
      <div>
        {fail.length} manga(s) <i>failed</i> to update
      </div>
      <br />
      <div>
        <Button type="primary" size="small" icon={<ReloadOutlined />} onClick={reload}>
          Reload page
        </Button>
      </div>
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
