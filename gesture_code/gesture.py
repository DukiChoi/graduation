import cv2
import mediapipe as mp
import numpy as np
import pyautogui as mouse
import time

#숫자 입력한 시간 체크
count = 0
keyboard_input = 0
# 2개 손 활용
max_num_hands = 2

# gesture 기존 값 활용
coin_gesture = {
    0:'zero', 1:'one', 9:'two', 2:'two', 3:'three', 4:'four', 5:'five',
    6:'delete', 8:'mouse_left(spiderman)', 10:'ok'
}

# MediaPipe hands model
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(
    max_num_hands=max_num_hands,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5)

# Gesture recognition model
file = np.genfromtxt('gesture_train.csv', delimiter=',')
angle = file[:,:-1].astype(np.float32)
label = file[:, -1].astype(np.float32)
knn = cv2.ml.KNearest_create()
knn.train(angle, cv2.ml.ROW_SAMPLE, label)
knn.save('gesture.xml')


cap = cv2.VideoCapture(0)


while cap.isOpened():
    ret, img = cap.read()
    if not ret:
        continue

    img = cv2.flip(img, 1)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    result = hands.process(img)

    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    if result.multi_hand_landmarks is not None:
        total_num = 0
        for res in result.multi_hand_landmarks:
            
            joint = np.zeros((21, 3))
            for j, lm in enumerate(res.landmark):
                joint[j] = [lm.x, lm.y, lm.z]

            # Compute angles between joints
            v1 = joint[[0,1,2,3,0,5,6,7,0,9,10,11,0,13,14,15,0,17,18,19],:] # Parent joint
            v2 = joint[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],:] # Child joint
            v = v2 - v1 # [20,3]
            # Normalize v
            v = v / np.linalg.norm(v, axis=1)[:, np.newaxis]

            # Get angle using arcos of dot product
            angle = np.arccos(np.einsum('nt,nt->n',
                v[[0,1,2,4,5,6,8,9,10,12,13,14,16,17,18],:], 
                v[[1,2,3,5,6,7,9,10,11,13,14,15,17,18,19],:])) # [15,]

            angle = np.degrees(angle) # Convert radian to degree

            # Inference gesture
            data = np.array([angle], dtype=np.float32)
            ret, results, neighbours, dist = knn.findNearest(data, 3)
            idx = int(results[0][0])

            # Draw gesture result
            if idx in coin_gesture.keys():
                org = (int(res.landmark[0].x * img.shape[1]), int(res.landmark[0].y * img.shape[0]))
                cv2.putText(img, text=coin_gesture[idx].upper(), org=(org[0], org[1] + 20), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(255, 255, 255), thickness=2)

                ## 뚜기 최!
                # 검지 손가락 좌표 (카메라 이미지 크기에 대한 비율) : x,y
                # github의 그림을 따라서 보면 8번 좌표가 검지 손가락 끝
                x,y = res.landmark[8].x, res.landmark[8].y
                cv2.putText(img, text='(%.2f, %.2f)'%(x,y), org=(org[0], org[1] - 20), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(255, 255, 255), thickness=2)

                num = idx

                if num == 9:
                    num = 2

                if 0 <= num < 6:
                    total_num += num

                '--------------------------------------'
                #마우스 움직여주기!!!!
                if num == 1:
                    mouse.moveTo(2560*x,1440*y,0.1)
                elif num == 8:
                    mouse.click(2560*x,1440*y, button='left')

                #키보드 입력 시작하기 위해 ok 사인으로 입력 여부 결정
                if(num == 10 and keyboard_input == 0):
                    count = count +1
                    if count == 100:
                        print('Get keyboardinput')
                        keyboard_input = 1
                        count = 0
                elif (num == 10 and keyboard_input == 1):
                    count = count + 1
                    if count == 100:
                        print('No keyboardinput')
                        keyboard_input = 0
                        count = 0
               #여기서부터는 진짜 키보드 입력
                if num == 6:
                    count = count + 1
                    if count == 50:
                        print('delete')
                        count = 0
                elif (total_num == 1 and keyboard_input == 1):
                    count = count+1
                    if count == 50:
                        print(1)
                        count = 0
                elif (total_num == 2 and keyboard_input == 1):
                    count = count + 1
                    if count == 50:
                        print(2)
                        count = 0
                elif (total_num == 3 and keyboard_input == 1):
                    count = count + 1
                    if count == 50:
                        print(3)
                        count = 0
                elif (total_num == 4 and keyboard_input == 1):
                    count = count + 1
                    if count == 50:
                        print(4)
                        count = 0
                elif (total_num == 5 and keyboard_input == 1):
                    count = count + 1
                    if count == 100:
                        print(5)
                        count = 0
                elif (total_num == 6 and keyboard_input == 1):
                    count = count + 1
                    if count == 50:
                        print(6)
                        count = 0
                elif (total_num == 7 and keyboard_input == 1):
                    count = count + 1
                    if count == 50:
                        print(7)
                        count = 0
                elif (total_num == 8 and keyboard_input == 1):
                    count = count + 1
                    if count == 50:
                        print(8)
                        count = 0
                elif (total_num == 9 and keyboard_input == 1):
                    count = count + 1
                    if count == 50:
                        print(9)
                        count = 0
                elif (total_num == 0 and keyboard_input == 1):
                    count = count + 1
                    if count == 100:
                        print(0)
                        count = 0

                '--------------------------------------'






            mp_drawing.draw_landmarks(img, res, mp_hands.HAND_CONNECTIONS)


        if total_num != 0:
            cv2.putText(img, text="Total Num is %i"%(total_num), org=(int(img.shape[1] / 3), int(img.shape[0] / 3)), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1.5, color=(0, 0, 255), thickness=3)


    cv2.imshow('LOL', img)
    if cv2.waitKey(1) == ord('q'):
        break
