롤 망해라


# gesture code

reference : https://github.com/kairess/Rock-Paper-Scissors-Machine

----------

```
python gesture.py
```

----------

## Pipeline 개요

1. keypoint detection : [mediapipe](https://google.github.io/mediapipe/)
2. 손가락 vector간의 angle을 구하여 KNN으로 회귀분석 [[trainset : gesture_train.csv]](https://github.com/kairess/Rock-Paper-Scissors-Machine/blob/main/data/gesture_train.csv)
3. 분석된 값들의 geture를 활용

----------

## Library Download (Python - pip 모듈 사용)

- open-cv
- mediapipe
- numpy

----------

## Hand Landmark (keypoint) Label [[링크!!]](https://google.github.io/mediapipe/solutions/hands.html)
![hand_landmark](https://user-images.githubusercontent.com/88364973/133178241-a09bdef2-4f22-473f-bfa4-7ccf86824886.png)

----------

## 활용

1. 마우스 포인터 : 검지손가락 (8번) 좌표 이용
2. 마우스 클릭 : 모름
3. 숫자 표시 : 양손 {0 : 5} + {0 : 5} = 총 {0 : 10} 의 숫자 표시 가능
4. 페이지 넘김 : ok (엄지 + 검지를 붙인 모양) 제스쳐
5. 지우기 : delete (엄지 + 새끼를 편 모양) 제스쳐

----------
