import event1 from './../../assets/event1.jpg';
import event2 from './../../assets/event2.jpg';
import event3 from './../../assets/event3.jpg';
import event4 from './../../assets/event4.jpg';
import event5 from './../../assets/event5.jpg';
import event6 from './../../assets/event6.jpg';
import event7 from './../../assets/event7.jpg';
import event8 from './../../assets/event8.jpg';
import event9 from './../../assets/event9.jpg';
import event10 from './../../assets/event10.jpg';
import event11 from './../../assets/event11.jpg';
import event12 from './../../assets/event12.jpg';
import event13 from './../../assets/event13.jpg';

type EventImages = {
    [key: string]: string;
};

const eventImages: EventImages = {
    event1,
    event2,
    event3,
    event4,
    event5,
    event6,
    event7,
    event8,
    event9,
    event10,
    event11,
    event12,
    event13,
    default: event1,
};

export default eventImages;
