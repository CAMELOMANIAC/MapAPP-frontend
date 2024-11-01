import { useEffect, useState } from "react";
import { App } from "@capacitor/app";
import { BackgroundTask } from "@capawesome/capacitor-background-task";
import { LocalNotifications } from "@capacitor/local-notifications";
import { isMobile } from "../utils/functions/commons";

const checkNotifications = async () => {
  const { notifications } = await LocalNotifications.getPending();
  console.log("Pending notifications:", notifications);
};

const cencleNotifications = async () => {
  await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
};

const Mypage = () => {
  const [count, setCount] = useState<number>(0);
  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     const { display } = await LocalNotifications.requestPermissions();
  //     if (display !== "granted") {
  //       console.error("Notifications not enabled on this device");
  //       return;
  //     }
  //   };

  //   // const handleStateChange = (state: any) => {
  //   //   console.log("App state changed. Is active?", state.isActive);
  //   // };
  //   // App.addListener("appStateChange", handleStateChange);

  //   App.addListener("appStateChange", async ({ isActive }) => {
  //     if (isActive) {
  //       return;
  //     }
  //     // The app state has been changed to inactive.
  //     // Start the background task by calling `beforeExit`.
  //     const taskId = await BackgroundTask.beforeExit(async () => {
  //       setTimeout(() => {
  //         console.log("App state changed. Is active?");
  //       }, 5000);

  //       LocalNotifications.schedule({
  //         notifications: [
  //           {
  //             title: "테스트 제목",
  //             body: "테스트 알림 몸체",
  //             id: 1,
  //             schedule: { at: new Date(Date.now() + 1000 * 5) },
  //             actionTypeId: "",
  //             extra: null,
  //             ongoing: true,
  //           },
  //         ],
  //       });
  //       // Run your code...
  //       // Finish the background task as soon as everything is done.
  //       BackgroundTask.finish({ taskId });
  //     });
  //   });

  //   requestPermissions();
  //   return () => {
  //     App.removeAllListeners();
  //   };
  // }, []);

  useEffect(() => {
    const setupNotifications = async () => {
      // 작업 유형 정의
      await LocalNotifications.createChannel({
        id: "default",
        name: "Default",
        importance: 3,
        visibility: 1,
      });

      await LocalNotifications.registerActionTypes({
        types: [
          {
            id: "OPEN_ACTION",
            actions: [
              {
                id: "open",
                title: "Open App",
              },
            ],
          },
        ],
      });

      // 알림 예약
      await LocalNotifications.schedule({
        notifications: [
          {
            title: `${count} Widgets are on sale`,
            body: "Widgets are on sale",
            id: 1, // id가 같으면 새 알람이 아니라 알림을 갱신함
            actionTypeId: "OPEN_ACTION",
            extra: null,
            ongoing: true,
          },
        ],
      });
    };

    if (isMobile()) setupNotifications();
  }, [count]);

  useEffect(() => {
    // 작업 리스너 추가
    LocalNotifications.addListener("localNotificationActionPerformed", (notification) => {
      if (notification.actionId === "open") {
        console.log("알람 버튼 실행 테스트");
        // 여기서 원하는 작업을 수행할 수 있습니다.
      }
    });
  }, []);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => (prev || 0) + 1)}>증가</button>
      <br />
      <button onClick={checkNotifications}>알람이 존재하나요?</button>
      <br />
      <button onClick={cencleNotifications}>알람 취소</button>
      <br />
    </>
  );
};

export default Mypage;
