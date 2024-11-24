//https://docs.google.com/document/d/1t9pD4CZhIadtJVHXWtVG2f0nmW3ukXqo2Oknwmq9BbA/edit#heading=h.cqz9mzx0jve8
class RateLimiter {
  constructor(max_requests, seconds_window, abuseThreshold, abuseWindow) {
    this.max_requests = max_requests;
    this.seconds_window = seconds_window;
    this.requests = new Map();
    this.abuseThreshold = abuseThreshold;
    this.abuseWindow = abuseWindow;
    this.userRequestTimes = {};
    this.userAbuseCounts = {};
    this.blockedUsers = new Set();
  }

  rateLimit(user, time) {
    let tempUserRequest = this.requests.get(user) || [];

    if (this.blockedUsers.has(user)) {
      return "user blocked";
    }

    if (!this.userRequestTimes[user]) {
      this.userRequestTimes[user] = [];
    }

    if (!this.userAbuseCounts[user]) {
      this.userAbuseCounts[user] = [];
    }
    // check the remained tasks that should be in the queue based on the timestamp
    while (
      tempUserRequest.length > 0 &&
      time - tempUserRequest[0].time >= this.seconds_window
    ) {
      tempUserRequest.shift();
    }
    // check if the remained requests number
    // if larger than the max request, reject
    if (tempUserRequest.length >= this.max_requests) {
      this.userAbuseCounts[user].push(time);
      if (this.userAbuseCounts[user].length >= this.abuseThreshold) {
        console.log(user);
        this.blockedUsers.add(user);
      }
      return "false";
    } else {
      // if smaller than the max request, add it into the queue
      tempUserRequest.push({ time: time });
      this.requests.set(user, tempUserRequest);
      this.userRequestTimes[user].push(time);
      return "true";
    }
  }
}

const r = new RateLimiter(3, 2, 2, 5);
console.log(r.rateLimit("user1", 10));
console.log(r.rateLimit("user1", 10));
console.log(r.rateLimit("user1", 10));
console.log(r.rateLimit("user1", 10));
console.log(r.rateLimit("user1", 11));
console.log(r.rateLimit("user1", 12));
console.log(r.rateLimit("user1", 12));
console.log(r.rateLimit("user1", 12));
console.log(r.rateLimit("user1", 12));
console.log(r.rateLimit("user1", 13));
console.log(r.rateLimit("user1", 14));
