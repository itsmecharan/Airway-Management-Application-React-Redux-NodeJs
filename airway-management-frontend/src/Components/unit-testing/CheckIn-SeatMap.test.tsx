import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import * as reactRedux from "react-redux";
import configureMockStore from "redux-mock-store";
import CheckInSeatMap from "../check-in/CheckIn-SeatMap";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { shallow, mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
const mockStore = configureMockStore();

const props = {
  checkin: {
    checkInSelectedFlightId: "",
    checkInFlightSchedule: [],
  },
};

const store = mockStore({ ...props });
const wrapper = mount(
  <Provider store={store}>
    <CheckInSeatMap />
  </Provider>
);

describe("Check In Seat Map Component Mounted", () => {
  beforeEach(() => {
    const {
      checkin: { checkInSelectedFlightId, checkInFlightSchedule },
    } = props;
    useSelectorMock.mockReturnValue({
      checkInSelectedFlightId,
      checkInFlightSchedule,
    });
  });
  afterAll(() => {
    useSelectorMock.mockClear();
  });
  it("It Should render", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("Verifying Dom Elements", () => {
    expect(wrapper.find("div").length).toBe(5);
    expect(wrapper.find("div div").length).toBe(4);
    expect(wrapper.find("div div button").length).toBe(5);
  });
  it("Creates a snapshot", () => {
    const rtrWrapper = renderer
      .create(
        <Provider store={store}>
          <CheckInSeatMap />
        </Provider>
      )
      .toJSON();
    expect(rtrWrapper).toMatchSnapshot();
  });
});
