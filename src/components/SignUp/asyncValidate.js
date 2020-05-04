

// gardé voir si ça peut sservir pour création de compte déjà existant

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values/*, dispatch */) => {
  return sleep(1000) // simulate server latency
    .then(() => {
      if ([ 'foo@foo.com', 'bar@bar.com' ].includes(values.email)) {
        throw { email: 'Email already Exists' }
      }
    });
};

export default asyncValidate;
