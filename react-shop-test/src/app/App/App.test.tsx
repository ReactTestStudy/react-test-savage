import { render, waitFor, screen } from '../../pages/util/test.util';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  test('From order to order completion', async () => {
    render(<App />);

    const americanInput = await screen.findByRole('spinbutton', {
      name: 'America',
    });
    userEvent.clear(americanInput);
    userEvent.type(americanInput, '2');

    const englandInput = await screen.findByRole('spinbutton', {
      name: 'England',
    });

    userEvent.clear(englandInput);
    userEvent.type(englandInput, '3');

    const insuranceCheckbox = await screen.findByRole('checkbox', {
      name: 'Insurance',
    });
    userEvent.click(insuranceCheckbox);

    // 주문하기 라고  value 값으로 측정하네
    const orderButton = screen.getByRole('button', {
      name: '주문하기',
    });

    userEvent.click(orderButton);

    /// 주문 확인 페이지 ////
    const summaryHeading = screen.getByRole('heading', {
      level: 1,
      name: '주문 확인',
    });
    const productsHeading = screen.getByRole('heading', {
      name: '여행 상품: 5500',
      level: 2,
    });
    const optionsHeading = screen.getByRole('heading', {
      name: '옵션: 500',
      level: 2,
    });
    const confirmCheckbox = screen.getByRole('checkbox', {
      name: '주문하려는 것을 확인하셧나요?',
    });

    const confirmOrderButton = screen.getByRole('button', {
      name: '주문 확인',
    });

    // 단순 document 안에 렌더링 되어잇는지 같음
    expect(summaryHeading).toBeInTheDocument();
    expect(productsHeading).toBeInTheDocument();
    expect(optionsHeading).toBeInTheDocument();
    expect(screen.getByText('2 America')).toBeInTheDocument();
    expect(screen.getByText('3 England')).toBeInTheDocument();
    expect(screen.getByText('Insurance')).toBeInTheDocument();

    userEvent.click(confirmCheckbox);
    confirmOrderButton.click();

    ///// 주문 완료 페이지 ////
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    const completeHeader = await screen.findByRole('heading', {
      level: 1,
      name: '주문이 성공했습니다',
    });

    expect(completeHeader).toBeInTheDocument();

    const loadingDisappeared = screen.queryByText('loading');
    expect(loadingDisappeared).not.toBeInTheDocument();

    const firstPageButton = screen.getByRole('button', {
      name: '첫 페이지로 돌아가기',
    });
    userEvent.click(firstPageButton);

    // 비동기 타이밍으로 인해 바로 넘어간다고 하는데 나는 나오지 않앗음
    // act Error

    ///// 다시 주문 페이지 /////////
    const productsTotal = screen.getByText('상품 총 가격: $0');
    const optionsTotal = screen.getByText('옵션 총 가격: $0');

    expect(productsTotal).toBeInTheDocument();
    expect(optionsTotal).toBeInTheDocument();
  });
});
