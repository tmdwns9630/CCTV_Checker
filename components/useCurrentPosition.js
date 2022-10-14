const { useState, useEffect } = require("react");

const useCurrentPosition = (options = {}) => {
  const [location, setLocation] = useState();
  const [error, setError] = useState();

  //성공 시 callbock 핸들러
  const handleSuccess = (pos) => {
    const { latuitude, longitude } = pos.coords;

    setLocation({
      latuitude,
      longitude,
    });
  };

  //실패 시 callback 핸들러
  const handleError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("Geolocation을 지원하지 않습니다.");
      return;
    }

    //지오로케이션 api 호출
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);
};

export default useCurrentPosition;
