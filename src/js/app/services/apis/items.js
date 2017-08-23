export default class UsersService {
  // eslint-disable-next-line
  getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              title: 'Item 1',
            },
            {
              id: 2,
              title: 'Item 2',
            },
          ],
        });
      }, 1000);
    });
  }
}
