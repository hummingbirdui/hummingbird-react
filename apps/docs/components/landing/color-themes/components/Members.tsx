const Members = () => {
  return (
    <div className="card border-subtle rounded-2xl h-full">
      <div className="card-body flex flex-col">
        <h6 className="card-title text-base">Select Members</h6>
        <ul className="list-group space-y-1">
          <li className="list-group-item rounded-lg py-1.5 list-group-item-action has-checked:bg-primary-lighter">
            <div className="form-check">
              <div className="avatar avatar-sm me-2">
                <img
                  src="/images/avatar/avatar_15.webp"
                  alt="Avatar"
                  className="rounded-full"
                />
              </div>
              <label
                htmlFor="firstCheckbox"
                className="form-check-label flex-1 text-sm font-semibold"
              >
                Sophie Turner
              </label>
              <label
                htmlFor="firstCheckbox"
                className="form-check-input-wrapper -me-2.5"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="firstCheckbox"
                  defaultChecked
                />
              </label>
            </div>
          </li>
          <li className="list-group-item rounded-lg py-1.5 list-group-item-action has-checked:bg-primary-lighter">
            <div className="form-check">
              <div className="avatar avatar-sm me-2">
                <img
                  src="/images/avatar/avatar_1.webp"
                  alt="Avatar"
                  className="rounded-full"
                />
              </div>
              <label
                htmlFor="thirdCheckbox"
                className="form-check-label flex-1 text-sm font-semibold"
              >
                Liam Anderson
              </label>
              <label
                htmlFor="thirdCheckbox"
                className="form-check-input-wrapper -me-2.5"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="thirdCheckbox"
                />
              </label>
            </div>
          </li>
          <li className="list-group-item rounded-lg py-1.5 list-group-item-action has-checked:bg-primary-lighter">
            <div className="form-check">
              <div className="avatar avatar-sm me-2">
                <img
                  src="/images/avatar/avatar_2.webp"
                  alt="Avatar"
                  className="rounded-full"
                />
              </div>
              <label
                htmlFor="fourthCheckbox"
                className="form-check-label flex-1 text-sm font-semibold"
              >
                Ava Smith
              </label>
              <label
                htmlFor="fourthCheckbox"
                className="form-check-input-wrapper -me-2.5"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="fourthCheckbox"
                />
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Members;
