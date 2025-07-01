# Algorithm Visualizer (알고리즘 시각화)

알고리즘 비주얼라이저는 다양한 정렬 알고리즘의 동작 과정을 시각적으로 표현하여 학습자들이 알고리즘을 쉽게 이해할 수 있도록 도와주는 웹 애플리케이션입니다.

## 🚀 주요 기능

### 정렬 알고리즘

- 버블 정렬 (Bubble Sort)
- 선택 정렬 (Selection Sort)
- 삽입 정렬 (Insertion Sort)
- 퀵 정렬 (Quick Sort)
- 병합 정렬 (Merge Sort)
- 힙 정렬 (Heap Sort)

### 시각화 기능

- 실시간 정렬 과정 애니메이션
- 상태별 색상 구분
  - 파란색: 미정렬 상태
  - 노란색: 비교 중인 요소
  - 빨간색: 교환 중인 요소
  - 보라색: 피벗 요소 (퀵 정렬)
  - 하늘색: 병합 중인 요소 (병합 정렬)
  - 초록색: 정렬 완료된 요소

### 제어 기능

- 재생/일시정지
- 처음으로 되돌리기
- 새로운 배열 생성
- 정렬 속도 조절
- 배열 크기 조절

## 🛠️ 기술 스택

### 핵심 기술

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (아이콘)

### 테스트 도구

- Vitest (테스트 프레임워크)
- @testing-library/react (React 컴포넌트 테스트)
- @testing-library/jest-dom (DOM 테스트 유틸리티)

## ⚙️ 설치 및 실행

1. 저장소 클론

```bash
git clone https://github.com/awesomelon/frontend-algorithm-visualize
cd frontend-algorithm-visualize
```

2. 의존성 설치

```bash
pnpm install
```

3. 개발 서버 실행

```bash
pnpm dev
```

4. 빌드

```bash
pnpm build
```

5. 테스트 실행

```bash
pnpm test
```

## 🎯 프로젝트 구조

```
src/
├── algorithms/
│   ├── __tests__/          # 각 알고리즘별 테스트
│   ├── bubbleSort.ts
│   ├── selectionSort.ts
│   ├── insertionSort.ts
│   ├── quickSort.ts
│   ├── mergeSort.ts
│   ├── heapSort.ts
│   └── index.ts
├── components/
│   ├── SortingVisualizer.tsx
│   ├── ControlPanel.tsx
│   ├── PlaybackControls.tsx
│   ├── AlgorithmDescription.tsx
│   ├── SortingBars.tsx
│   ├── Legend.tsx
│   └── CodeDisplay.tsx
├── hooks/
│   ├── useArrayGenerator.ts
│   └── useSortingAnimation.ts
├── utils/
│   └── colorUtils.ts
├── types/
│   └── sorting.ts
├── App.tsx
└── main.tsx
```

## 🧪 테스트

이 프로젝트는 **TDD(Test-Driven Development)** 방식으로 개발되었습니다.

### 테스트 실행

```bash
# 모든 테스트 실행
pnpm test

# 테스트 한 번 실행 (watch 모드 없이)
pnpm test:run

# UI와 함께 테스트 실행
pnpm test:ui
```

### 테스트 커버리지

- **50개 테스트** 모두 통과 ✅
- **6개 알고리즘** 완전 검증
- **각 알고리즘별 엣지 케이스** 포함

## 🔍 알고리즘 상세 정보

### 힙 정렬 (Heap Sort) ⭐ 새로 추가!

힙 정렬은 **완전 이진 트리** 기반의 힙 자료구조를 활용한 정렬 알고리즘입니다.

#### 특징:

- ⚡ **일정한 성능**: 최악의 경우에도 O(n log n) 보장
- 🧠 **메모리 효율적**: 추가 메모리 공간 불필요 (제자리 정렬)
- 🔄 **불안정 정렬**: 같은 값의 상대적 순서가 바뀔 수 있음

#### 동작 과정:

1. **힙 구성 (Heapify)**: 배열을 최대 힙으로 변환
2. **요소 추출**: 힙의 루트(최댓값)를 배열 끝으로 이동
3. **힙 재조정**: 힙 크기를 줄이고 힙 속성 복원
4. **반복**: 모든 요소가 정렬될 때까지 2-3 과정 반복

#### 언제 사용하나요?

- 📊 **메모리가 제한적인 환경**에서 안정적인 성능이 필요할 때
- 🎯 **최악의 경우 성능**을 보장해야 할 때
- 🔢 **우선순위 큐** 구현 시

## 📝 정렬 알고리즘 시간 복잡도

| 알고리즘  | 평균 시간 복잡도 | 공간 복잡도 | 특징                            |
| --------- | ---------------- | ----------- | ------------------------------- |
| 버블 정렬 | O(n²)            | O(1)        | 간단하지만 비효율적             |
| 선택 정렬 | O(n²)            | O(1)        | 항상 최솟값을 찾아 교환         |
| 삽입 정렬 | O(n²)            | O(1)        | 부분적으로 정렬된 배열에 효과적 |
| 퀵 정렬   | O(n log n)       | O(log n)    | 분할 정복 기반, 평균적으로 빠름 |
| 병합 정렬 | O(n log n)       | O(n)        | 안정 정렬, 항상 일정한 성능     |
| 힙 정렬   | O(n log n)       | O(1)        | 힙 자료구조 활용, 메모리 효율적 |

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🙏 감사의 글

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

## 📞 문의하기

프로젝트 관련 문의사항이 있으시다면 이슈를 생성해 주시거나 다음 연락처로 문의해 주세요:

- Email: [bangjh1114@gmail.com](mailto:bangjh1114@gmail.com)
- Website: [j-ho.dev](https://j-ho.dev)
