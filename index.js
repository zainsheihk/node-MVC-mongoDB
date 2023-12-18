import { format } from "date-fns";
import { v4 as uuid } from "uuid";
console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));
console.log(uuid());
