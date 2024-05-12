type Subscription = {
    package: "Free" | "Standard" | "Pro" | "Enterprise";
    start: Date;
    end: Date;
};

export default Subscription;
