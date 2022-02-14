type Route = {
    regex: RegExp;
    controller: (body: RequestBody | undefined, options: any) => any;
};

type RequestBody = {
    email?: string;
    password?: string;
};

const fakeUser = {
    user: 'admin',
    password: 'admin',
};

const successResponse = {
    statusText: 'OK',
    status: 200,
};

const notFoundErrorResponse = (path: string) => ({
    status: 404,
    statusText: `${path} not found`,
});

const badRequestResponse = {
    status: 400,
    statusText: 'Bad request',
};

const login = (body?: RequestBody) => {
    if (body && (!body.email || !body.password)) {
        throw badRequestResponse;
    }
    return fakeUser;
};

const mockDashboardData = {
    data: [
        { id: 1111, name: 'Iphone 12 pro' },
        { id: 2222, name: 'Apple watch series 6' },
        { id: 3333, name: 'Apple watch SE' },
    ],
    sorting: { field: 'id', order: 'ASC' },
};

const mockProductData = {
    id: 1111,
    name: 'Iphone 12 pro',
};

const loadFakeUser = () => fakeUser;

const loadDashboardData = () => mockDashboardData;

const loadProductData = () => mockProductData;

const logout = () => null;

const wait = (delay: number) =>
    new Promise(resolve => setTimeout(resolve, delay));

const requestHandler = async (
    path: string,
    body?: RequestBody,
    options?: any
) => {
    const routes = [
        { regex: /^auth\/login\/$/, controller: loadFakeUser },
        { regex: /^auth\/login$/, controller: login },
        { regex: /^auth\/logout$/, controller: logout },
        { regex: /^dashboard$/, controller: loadDashboardData },
        { regex: /^product$/, controller: loadProductData },
    ];

    const route: Route | undefined = routes.find(fakeRoute =>
        fakeRoute.regex.test(path)
    );
    if (!route || !route.controller) {
        throw notFoundErrorResponse(path);
    }

    const { controller }: Route = route;
    const response = {
        ...successResponse,
        data: controller(body, options),
    };
    await wait(1000);
    return response;
};

const mockRequest = {
    get: requestHandler,
    post: requestHandler,
};

export default mockRequest;
