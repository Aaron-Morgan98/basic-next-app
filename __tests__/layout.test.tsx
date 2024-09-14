import { render } from "@testing-library/react";
import RootLayout from "../src/app/[locale]/layout";

describe('Layout', () => {


    it('renders without crashing', async () => {
        const { container } = render(await RootLayout({ children: <div>Test Child</div>, params: { locale: 'en'} }));
        expect(container).toBeInTheDocument();
    });

    it('matches snapshot', async () => {
        const { container } = render(await RootLayout({ children: <div>Test Child</div>, params: { locale: 'en'} }));
        expect(container).toMatchSnapshot();
    });
});