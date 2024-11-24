//https://docs.google.com/document/d/1K6L-pdbkNH7Z1tlB7XE8aO2yEq8VG-ysQaihz1UUmRg/edit
// Define custom error types
class RetryableError extends Error {
    constructor(message) {
        super(message);
        this.name = "RetryableError";
    }
}

class NotRetryableError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotRetryableError";
    }
}

class RatelimitErrors extends Error {
    constructor(message) {
        super(message);
        this.name = "RatelimitErrors"
    }
}

class InternalError extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalErrors"
    }
}

// Define the FakeLibrary object
const FakeLibrary = {
    process: function(input) {
        // Generate a random number between 0 and 1
        const randomValue = Math.random();

        if (randomValue < 0.01) {
            // 25% chance to throw RetryableError
            throw new RetryableError("This is a retryable error.");
        } else if (randomValue < 0.02) {
            // 25% chance to throw NotRetryableError
            throw new NotRetryableError("This is a not retryable error.");
        } else if(randomValue < 0.03) {
            throw new RatelimitErrors("This is a rate limit error.")
        }
        else {
            // 25% chance to return a processed string
            return `${input}`;
        }
    }
};

// Example usage
// try {
//     const result = FakeLibrary.process("example input");
//     console.log(result);
// } catch (error) {
//     if (error instanceof RetryableError) {
//         console.error(`Caught a retryable error: ${error.message}`);
//     } else if (error instanceof NotRetryableError) {
//         console.error(`Caught a not retryable error: ${error.message}`);
//     } else {
//         console.error(`Caught an unknown error: ${error.message}`);
//     }
// }
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const processWithRetry = async (input, maxRetryTime = 4) => {
    let attempts = 0
    let rateLimits = 1
    while (attempts < maxRetryTime) {
        console.log("attempts: ", attempts)
        try {
            const result = FakeLibrary.process(input)
            if (result === "error") {
                throw new InternalError("An internal error occurred.");
              }
              return result;
        } catch (error) {
            if(error instanceof RetryableError) {
                rateLimits = 1
                attempts ++
            } else if(error instanceof NotRetryableError){
                rateLimits = 1
                throw new NotRetryableError("This is a first not retryable error.");
            } else if(error instanceof RatelimitErrors) {
                console.log("ratelimits: ", rateLimits)
                await delay(rateLimits * 1000)
                rateLimits ++
                attempts ++
            } else if (error instanceof InternalError) {
                throw new InternalError("error");
            }
        }
    }
    throw new NotRetryableError("This is a last no retryable error.");
}

(async () => {
    try {
      const result = await processWithRetry("error");
      console.log(result);
    } catch (error) {
      console.error("Error:", error.message);
    }
  })();