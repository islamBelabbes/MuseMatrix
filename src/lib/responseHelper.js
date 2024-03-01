export const sendCreated = ({ message, data }) => {
  return Response.json(
    {
      success: true,
      message,
      data,
    },
    {
      status: 201,
    }
  );
};

export const sendOk = ({ message, data, ...rest }) => {
  return Response.json(
    {
      success: true,
      message,
      data,
      ...rest,
    },
    {
      status: 200,
    }
  );
};

export const sendBadRequest = ({ message, data }) => {
  return Response.json(
    {
      success: false,
      message,
      data,
    },
    {
      status: 400,
    }
  );
};

export const sendConflict = ({ message }) => {
  return Response.json(
    {
      success: false,
      message,
    },
    {
      status: 409,
    }
  );
};

export const sendUnauthorized = ({ message }) => {
  return Response.json(
    {
      success: false,
      message: message
        ? message
        : "sorry you are not Allowed to access this Resource",
    },
    {
      status: 401,
    }
  );
};

export const sendForbidden = () => {
  return Response.json(
    {
      success: false,
      message: "You do not have rights to access this Resource.",
    },
    {
      status: 403,
    }
  );
};

export const sendNotFound = ({ message }) => {
  return Response.json(
    {
      success: false,
      message: message ? message : "Resource not found",
    },
    {
      status: 404,
    }
  );
};

export const sendServerError = () => {
  return Response.json(
    {
      success: false,
      message: "Something went wrong.",
    },
    {
      status: 500,
    }
  );
};

export const sendNoContent = () => {
  return new Response("no content", {
    status: 200,
  });
};

export const setHeadersForCORS = (req, next) => {
  Response.header("Access-Control-Allow-Origin", "*");
  Response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-Access-Token, Content-Type, Accept"
  );
  next();
};

export const throwUnknown = (callback) => {
  const newError = new Error("an error occurred");
  newError.status = 500;
  callback;
};
