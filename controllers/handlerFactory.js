exports.deleteOne = (Model) => async (req, res) => {
  try {
    const id = req.params.id;
    await Model.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: error,
    });
  }
};

exports.updateOne = (Model) => async (req, res) => {
  const id = req.params.id;
  const doc = await Model.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
};

exports.createOne = (Model) => async (req, res) => {
  const doc = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
};

exports.getOne = (Model, populateOption) => async (req, res) => {
  let query = Model.findById(req.paramas.id);
  if (populateOption) {
    query = query.populate(populateOption);
  }

  const id = req.params.id;
  const doc = await Model.findById(id).populate('reviews');

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
};
